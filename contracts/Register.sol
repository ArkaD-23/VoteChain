// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Register {
    struct User {
        string username;
        string email;
        bytes32 passwordHash;
        bool isRegistered;
    }

    mapping(address => User) public users;

    event UserRegistered(address indexed user, string username, string email);

    modifier notRegistered() {
        require(!users[msg.sender].isRegistered, "User already registered");
        _;
    }

    function registerUser(string memory _username, string memory _email, string memory _password) public notRegistered {
        require(bytes(_username).length > 0, "Username is required");
        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_password).length > 0, "Password is required");

        users[msg.sender] = User({
            username: _username,
            email: _email,
            passwordHash: keccak256(abi.encodePacked(_password)),
            isRegistered: true
        });

        emit UserRegistered(msg.sender, _username, _email);
    }

    function getUser(address _user) public view returns (string memory, string memory, bool) {
        require(users[_user].isRegistered, "User not found");
        return (users[_user].username, users[_user].email, users[_user].isRegistered);
    }

    function verifyPassword(string memory _password) public view returns (bool) {
        require(users[msg.sender].isRegistered, "User not registered");
        return users[msg.sender].passwordHash == keccak256(abi.encodePacked(_password));
    }
}
