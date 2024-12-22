// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BondContract {
    struct Bond {
        uint256 id;
        string name;
        uint256 value;
        uint256 purchaseTime;
        uint256 maturityTime;
        uint256 interestRate;
        address owner;
        bool isActive;
    }

    mapping(uint256 => Bond) public bonds;
    mapping(address => uint256[]) public userBonds;
    uint256 public bondCounter;

    event BondPurchased(uint256 bondId, address buyer, uint256 value);
    event BondSold(uint256 bondId, address seller, uint256 value);

    constructor() {
        bondCounter = 0;
    }

    function purchaseBond(
        string memory _name,
        uint256 _value,
        uint256 _maturityTime,
        uint256 _interestRate
    ) public payable returns (uint256) {
        require(msg.value >= _value, "Insufficient payment");

        uint256 bondId = bondCounter++;
        bonds[bondId] = Bond({
            id: bondId,
            name: _name,
            value: _value,
            purchaseTime: block.timestamp,
            maturityTime: _maturityTime,
            interestRate: _interestRate,
            owner: msg.sender,
            isActive: true
        });

        userBonds[msg.sender].push(bondId);
        emit BondPurchased(bondId, msg.sender, _value);
        return bondId;
    }

    function sellBond(uint256 _bondId) public {
        Bond storage bond = bonds[_bondId];
        require(bond.owner == msg.sender, "Not bond owner");
        require(bond.isActive, "Bond not active");

        uint256 currentValue = calculateCurrentValue(_bondId);
        bond.isActive = false;
        payable(msg.sender).transfer(currentValue);

        emit BondSold(_bondId, msg.sender, currentValue);
    }

    function calculateCurrentValue(uint256 _bondId) public view returns (uint256) {
        Bond storage bond = bonds[_bondId];
        require(bond.isActive, "Bond not active");

        uint256 timeElapsed = block.timestamp - bond.purchaseTime;
        uint256 totalTime = bond.maturityTime - bond.purchaseTime;
        
        if (timeElapsed >= totalTime) {
            return bond.value + (bond.value * bond.interestRate / 100);
        }

        uint256 partialInterest = (bond.value * bond.interestRate * timeElapsed) / (totalTime * 100);
        return bond.value + partialInterest;
    }

    function getUserBonds(address _user) public view returns (uint256[] memory) {
        return userBonds[_user];
    }

    function getBondDetails(uint256 _bondId) public view returns (
        uint256 id,
        string memory name,
        uint256 value,
        uint256 purchaseTime,
        uint256 maturityTime,
        uint256 interestRate,
        address owner,
        bool isActive
    ) {
        Bond storage bond = bonds[_bondId];
        return (
            bond.id,
            bond.name,
            bond.value,
            bond.purchaseTime,
            bond.maturityTime,
            bond.interestRate,
            bond.owner,
            bond.isActive
        );
    }
}
