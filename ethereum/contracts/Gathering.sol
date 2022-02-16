// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Gathering {
    struct Participant {
        string name;
        uint256 signupDate;
        bool attended;
    }

    address public manager;
    string public name;
    uint256 public downpayment;
    string public status;

    mapping(address => Participant) public participantsMapping;
    address[] public participantIds;

    constructor(
        address _manager,
        string memory _name,
        uint256 _downpayment
    ) {
        manager = _manager;
        name = _name;
        downpayment = _downpayment;
        status = "INITIALIZED";
    }

    function openInvitation() public managerOnly atStatus("INITIALIZED") {
        status = "INVITATION_OPEN";
    }

    function join(string memory _name)
        public
        payable
        atStatus("INVITATION_OPEN")
    {
        require(
            msg.value >= downpayment,
            "Insufficient funds to make a downpayment."
        );

        require(
            participantsMapping[msg.sender].signupDate == 0,
            "Already registered to the gathering."
        );

        participantsMapping[msg.sender] = Participant({
            name: _name,
            signupDate: block.timestamp,
            attended: false
        });
        participantIds.push(msg.sender);
    }

    function closeInvitation() public managerOnly atStatus("INVITATION_OPEN") {
        status = "INVITATION_CLOSED";
    }

    function getDetails()
        external
        view
        returns (
            string memory,
            uint256,
            string memory,
            address,
            uint256,
            uint256
        )
    {
        return (
            name,
            downpayment,
            status,
            manager,
            address(this).balance,
            participantIds.length
        );
    }

    modifier managerOnly() {
        require(
            msg.sender == manager,
            "Operation is restricted to the manager only."
        );
        _;
    }

    modifier atStatus(string memory _status) {
        require(
            keccak256(abi.encodePacked(status)) ==
                keccak256(abi.encodePacked(_status)),
            "Can't perform operation with the current status."
        );

        _;
    }
}
