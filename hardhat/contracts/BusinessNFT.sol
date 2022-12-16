// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./PunkCities.sol";


interface DaiToken {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(
    address sender,
    address recipient,
    uint256 amount
  ) external returns (bool);

}

contract BusinessNFT is ERC721URIStorage {

    //PunkCity private _PunkCity;
    uint256 businessNumber = 0;
    DaiToken public daiToken;
    address Vault;

    struct businessDetails {
        uint256 tokenId;
        string city;
        string businessType;
        string kind;
        string description;
        string shortname;
        address owner;
        string googleAddress;

        uint256 createdAt; // timestamp
        string[] services; // services
        string ipfsHash;
    }

    businessDetails [] businesses;

    mapping(uint256 => mapping(address => bool)) alreadyVoted;
    mapping(uint256 => uint256) upVotes;
    mapping(uint256 => uint256) downVotes;
    mapping(uint256 => businessDetails) businessMapping;
    mapping(address => businessDetails[]) myBusinessess;
    mapping(address => mapping(uint256 => businessDetails[])) myBusinesses;
    mapping(uint256 => address) businessOwner;
    mapping(uint256 => uint256) placeVerification;
    mapping(address => uint256) businessNumberMapping;
    mapping(address => bool) registeredABusiness;
    mapping(address => businessDetails) businessbyOwner;
    mapping(address => mapping(uint256 => string)) ownIpfsHash; // needed for retrieving the logo pictures in the own business site
    mapping(address => mapping(uint256 => string)) tokenIdHash;
    mapping(uint256 => string) tokenIdtoIpfsHash;

    constructor(address _Vault) ERC721("BusinessNFT", "BT") {
        daiToken = DaiToken(0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F);
        Vault = _Vault;
    }

    function checkYourDaiBalance() public view returns(uint256) {
        return daiToken.balanceOf(msg.sender);
    }

    function createBusiness(string memory cityName, string memory _businessType, string memory kind, string memory description,  string memory name, string memory _googleAddress, string[] memory _services, string memory URI, string memory ipfsHash) public {
        //require(_PunkCity.checkRegisteredPlace(msg.sender) == true, "You must be registered for Punk Cities in order to create a Business");
        //require(registeredABusiness[msg.sender] == false, "You already own a business");
        require(daiToken.balanceOf(msg.sender) >= 100000000000000000 wei, "You do not have enough Dai to mint this NFT");

        businessDetails memory nextBusiness = businessDetails(businesses.length, cityName, _businessType, kind, description, name, msg.sender, _googleAddress, block.timestamp, _services, ipfsHash);
        businesses.push(nextBusiness);
        myBusinessess[msg.sender].push(nextBusiness);
        _mint(msg.sender, businessNumber);
        _setTokenURI(businessNumber, URI);
        registeredABusiness[msg.sender] = true;
        businessNumberMapping[msg.sender] = businessNumber;
        businessbyOwner[msg.sender] = nextBusiness;
        ownIpfsHash[msg.sender][businessNumber] = ipfsHash;
        tokenIdtoIpfsHash[businessNumber] = ipfsHash;
        businessNumber++;
        daiToken.transfer(Vault, 100000000000000000 wei);
    }

    function getBusiness(uint256 _id) public view returns(uint256, string memory, string memory, address, string memory, uint256, string[] memory) {
        return (businesses[_id].tokenId, businesses[_id].city, businesses[_id].shortname, businesses[_id].owner,
                businesses[_id].googleAddress, businesses[_id].createdAt, businesses[_id].services);
    }

    function getBusinessByOwner() public view returns (businessDetails memory){
        return businessbyOwner[msg.sender];
    }

    function deleteBusiness(uint256 _businessId) public {
        require(businessOwner[_businessId] == msg.sender);

        delete businessOwner[_businessId];
    }

    function getBusinessId(address _address) public view returns(uint256){
        return businessNumberMapping[_address];
    }

    function verifyBusiness(uint256 _tokenId) external {
       //require(_PunkCity.checkRegisteredPlace(msg.sender) == true, "You must be registered for Punk Cities in order to verify a place");

        placeVerification[_tokenId]++;
    }

    function checkBusinessVerification(uint256 _tokenId) public view returns(uint256){
        return placeVerification[_tokenId]; // How many times this business have been verified
    }

    function ownsABusiness(address _businessOwner) public view returns (bool) {
        return registeredABusiness[_businessOwner];
    }

    function listAllBusinessNfts() public view returns(businessDetails[] memory) {
        return businesses;
    }

    // function getyourIpfsHash() public view returns (string memory) {
    //     return ownIpfsHash[msg.sender][businessNumberMapping[msg.sender]];
    // }

    function getyourIpfsHashbyTokenid(uint256 _tokenId) public view returns (string memory) {
        return ownIpfsHash[msg.sender][_tokenId];
    }

    function getAllIpfsHashbyTokenId(uint256 _tokenId) public view returns(string memory) {
        return tokenIdtoIpfsHash[_tokenId];
    }

    function listAllOfMyBusiness() public view returns(businessDetails[] memory){
        return myBusinessess[msg.sender];
    }

    function upVote(uint256 _businessId) public returns (bool) {
        require(alreadyVoted[_businessId][msg.sender] == false, "You cannot vote on a business more than once");
        alreadyVoted[_businessId][msg.sender] = true;
        upVotes[_businessId]++;
        return true;
    }

    function downVote(uint256 _businessId) public returns (bool) {
        require(alreadyVoted[_businessId][msg.sender] == false, "You cannot vote on a business more than once");
        alreadyVoted[_businessId][msg.sender] = true;
        downVotes[_businessId]++;
        return true;
    }

    function getUpVotes(uint256 _businessId) public view returns (uint256) {
        return upVotes[_businessId];
    }

    function getDownVotes(uint256 _businessId) public view returns(uint256) {
        return downVotes[_businessId];
    }
}
