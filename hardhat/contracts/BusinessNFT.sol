  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./PunkCities.sol";

contract BusinessNFT is ERC721URIStorage {

    PunkCities private _PunkCities; 
    uint256 businessNumber = 1;

    struct businessDetails {
        uint256 tokenId;
        string city;
        string shortDescription;
        address owner;
        string googleAddress;
        string logo;
        uint256 createdAt; // timestamp
        string[] services; // services
    }

    businessDetails [] businesses;

    mapping(uint256 => businessDetails) businessMapping;
    mapping(uint256 => address) businessOwner;
    mapping(uint256 => uint256) placeVerification;
    mapping(address => uint256) businessNumberMapping;
    mapping(address => bool) registeredABusiness;

    constructor(address punkcitycontract) ERC721("BusinessNFT", "BT") {
        setPunkcityContract(punkcitycontract);
    }

    function setPunkcityContract(address _punkcityAddress) public {
        _PunkCities = PunkCities(_punkcityAddress);
    }

    function createBusiness(string memory cityName, string memory description, string memory _googleAddress, string memory _logo, string[] memory _services) public {
        require(_PunkCities.checkRegisteredPlace(msg.sender) == true, "You must be registered for Punk Cities in order to create a Business");
        require(registeredABusiness[msg.sender] == false, "You already own a business");
        // Does one member can have only one business, or can have more?
        businessDetails memory nextBusiness = businessDetails(businesses.length, cityName, description, msg.sender, _googleAddress, _logo, block.timestamp, _services);
        businesses.push(nextBusiness);
        _mint(msg.sender, businessNumber);

        registeredABusiness[msg.sender] = true;
        businessNumberMapping[msg.sender] = businessNumber;

        businessNumber++;
    }

    function getBusiness(uint256 _id) public view returns(uint256, string memory, string memory, address, string memory, uint256, string[] memory) {
        return (businesses[_id].tokenId, businesses[_id].city, businesses[_id].shortDescription, businesses[_id].owner,
                businesses[_id].googleAddress, businesses[_id].createdAt, businesses[_id].services);
    }

    function deleteBusiness(uint256 _businessId) public {
        require(businessOwner[_businessId] == msg.sender);

        delete businessOwner[_businessId];
    }

    function getBusinessId(address _address) public view returns(uint256){
        return businessNumberMapping[_address];
    }

  /*  function listAllBusiness() public view returns(string[] memory lists){ ============> This function might not be needed as we will lists everything with Covalent probably
        string[] memory _listOfBusinesses = new string[](businesses.length);
        for(uint256 i = 0; i < businesses.length; i++){
            
        }        


        return _listOfBusinesses;



        if(businesses.length == 0){
            return new string[](0);
        }
        else {
            uint256[] memory _listOfBusinesses = new uint[](businesses.length);
            for(uint256 i = 0; i < businesses.length; i++){
                _listOfBusinesses.push(businessDetails[i].shortDescription);
            }
                    return _listOfBusinesses;
        } 

    }  */

    function verifyBusiness(uint256 _tokenId) external {
        require(_PunkCities.checkRegisteredPlace(msg.sender) == true, "You must be registered for Punk Cities in order to verify a place");

        placeVerification[_tokenId]++;
    }

    function checkBusinessVerification(uint256 _tokenId) public view returns(uint256){
        return placeVerification[_tokenId]; // How many times this business have been verified
    }

    function ownsABusiness(address _businessOwner) public view returns (bool) {
        return registeredABusiness[_businessOwner];
    }

   /* function listServices() public view returns(string memory) {
        uint256 businessNumber = businessNumberMapping[msg.sender];
        return 
    } */
    
}
