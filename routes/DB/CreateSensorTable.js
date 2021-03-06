
var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:3000"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "DynamoSensorTable",
    KeySchema: [
        { AttributeName: "Sensor_id", KeyType: "HASH"},
        { AttributeName: "Sensed_at", KeyType: "RANGE" }  //Sort key
        //Partition key
    ],
    AttributeDefinitions: [
        { AttributeName: "Sensor_id", AttributeType: "S" },
        { AttributeName: "Sensed_at", AttributeType: "N" }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};

dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});

