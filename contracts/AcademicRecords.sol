// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AcademicRecords {
    struct Record {
        string studentName;
        string grade;
    }

    mapping(string => Record) private records;
    string[] private studentIds;

    function createRecord(string memory _id, string memory _studentName, string memory _grade) public {
        records[_id] = Record(_studentName, _grade);
        studentIds.push(_id);
    }

    function getRecord(string memory _id) public view returns (string memory, string memory) {
        Record memory record = records[_id];
        return (record.studentName, record.grade);
    }

    function getAllRecords() public view returns (Record[] memory) {
        Record[] memory allRecords = new Record[](studentIds.length);
        for (uint i = 0; i < studentIds.length; i++) {
            allRecords[i] = records[studentIds[i]];
        }
        return allRecords;
    }
}
