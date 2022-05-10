   // SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract BusinessNFT is ERC721URIStorage {
    
    uint256 businessNumber = 1;

    struct businessDetails {
        uint256 tokenId;
        string city;
        string shortDescription;
        address owner;
        string googleAddress;
        string logo;
        uint64 createdAt; // timestamp
        string[] services; // services
    }

    businessDetails [] businesses;

    mapping(uint256 => businessDetails) businessMapping;
    mapping(uint256 => address) businessOwner;
    mapping(uint256 => uint256) placeVerification;

    constructor() ERC721("BusinessNFT", "BT") {

    }

    function createBusiness(string memory cityName, string memory description, string memory _googleAddress) public {
    
        businessDetails memory nextBusiness = businessDetails(businesses.length, cityName, description, msg.sender, _googleAddress);
        businesses.push(nextBusiness);
        _mint(msg.sender, businessNumber);

        businessNumber++;
    }

    function getBusiness(uint256 _id) public view returns(uint256, string memory, string memory) {
        return (businesses[_id].tokenId, businesses[_id].city, businesses[_id].shortDescription);
    }

    function deleteBusiness(uint256 _businessId) public {
        require(businessOwner[_businessId] == msg.sender);

        delete businessOwner[_businessId];
    }

    function listAllBusiness() public view returns(string[] memory lists){
        string[] memory _listOfBusinesses = new string[](businesses.length);
        for(uint256 i = 0; i < businesses.length; i++){
            
        }        


        return _listOfBusinesses;



      /*  if(businesses.length == 0){
            return new string[](0);
        }
        else {
            uint256[] memory _listOfBusinesses = new uint[](businesses.length);
            for(uint256 i = 0; i < businesses.length; i++){
                _listOfBusinesses.push(businessDetails[i].shortDescription);
            }
                    return _listOfBusinesses;
        } */

    }

    // function verifyBusiness: 
    // In this function we would need somebody that is already a member in PunkCities in order to be
    // eligible for verify a place
    // A mapping has been already made for checking the verification
    // for this function we probably will need to rewrite the Punkcities contract a bit
    // to check that the owner who is verifying is actually a player
    // Itt elég kiírni azt is hogy hányan verifiolták, nem kell booelanos mapping
    
}
