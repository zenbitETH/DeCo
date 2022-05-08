// contracts/PlaceToken.sol
//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PlaceToken is ERC721 {
    
    //to hold the types of places
    enum PlaceCategory {
        Bar,
        Hospital,
        ShoppingMall
    }

    struct RegisteredPlace {
        string name;
        PlaceCategory category;
        string googleAddress;
        address owner;
        uint tokenId;
        string tags;
    }


    mapping(uint => RegisteredPlace) private _registeredPlaces;
    RegisteredPlace[] public registeredPlaceArray;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("PlaceToken", "PT") {
        console.log("Deploying PlaceToken contract");
    }

    function createPlace(string memory _name, PlaceCategory _category, string memory _googleAddress, uint _tokenId, string memory _tags)
        public
        returns (uint256)
    {
        RegisteredPlace memory registeredPlace = RegisteredPlace(
            _name, 
            _category, 
            _googleAddress, 
            msg.sender, 
            _tokenId, 
            _tags
        );

        registeredPlaceArray.push(registeredPlace);
        return _tokenId;

    }


}

