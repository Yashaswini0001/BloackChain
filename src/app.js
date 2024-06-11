const contractAddress = "0x39Fa77EE7E517989Bb9D8570465f98F67f09F12D"; // Replace with your contract address
const contractABI = [
    {
        "inputs": [
            {"internalType": "string", "name": "_id", "type": "string"},
            {"internalType": "string", "name": "_studentName", "type": "string"},
            {"internalType": "string", "name": "_grade", "type": "string"}
        ],
        "name": "createRecord",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "string", "name": "_id", "type": "string"}
        ],
        "name": "getRecord",
        "outputs": [
            {"internalType": "string", "name": "", "type": "string"},
            {"internalType": "string", "name": "", "type": "string"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllRecords",
        "outputs": [
            {
                "components": [
                    {"internalType": "string", "name": "studentName", "type": "string"},
                    {"internalType": "string", "name": "grade", "type": "string"}
                ],
                "internalType": "struct AcademicRecords.Record[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let contract;

window.onload = async () => {
    try {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            contract = new web3.eth.Contract(contractABI, contractAddress, { from: accounts[0] });
            console.log('Contract initialized:', contract);
        } else {
            throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    } catch (error) {
        document.getElementById('error').innerText = `Error initializing contract: ${error.message}`;
        console.error('Error initializing contract:', error);
    }
};

async function createRecord() {
    try {
        const id = document.getElementById('recordId').value;
        const studentName = document.getElementById('studentName').value;
        const grade = document.getElementById('grade').value;
        console.log('Creating record with id:', id, 'studentName:', studentName, 'grade:', grade);
        await contract.methods.createRecord(id, studentName, grade).send();
        console.log('Record created successfully');
    } catch (error) {
        document.getElementById('error').innerText = `Error creating record: ${error.message}`;
        console.error('Error creating record:', error);
    }
}

async function getRecord() {
    try {
        const id = document.getElementById('queryId').value;
        const record = await contract.methods.getRecord(id).call();
        document.getElementById('result').innerText = `Student Name: ${record[0]}, Grade: ${record[1]}`;
    } catch (error) {
        document.getElementById('error').innerText = `Error fetching record: ${error.message}`;
        console.error('Error fetching record:', error);
    }
}

async function getAllRecords() {
    try {
        console.log('Fetching all records...');
        const records = await contract.methods.getAllRecords().call();
        console.log('Records fetched:', records);
        const resultDiv = document.getElementById('allResults');
        resultDiv.innerHTML = '';
        records.forEach((record, index) => {
            const recordDiv = document.createElement('div');
            recordDiv.innerText = `Record ${index + 1}: Student Name: ${record.studentName}, Grade: ${record.grade}`;
            resultDiv.appendChild(recordDiv);
        });
    } catch (error) {
        document.getElementById('error').innerText = `Error fetching all records: ${error.message}`;
        console.error('Error fetching all records:', error);
    }
}
