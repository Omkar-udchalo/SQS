const AWS = require("aws-sdk");
// var fs = require("fs");
const ID = "";
const SECRET = "";
AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: "ap-south-1",
});

var sqs = new AWS.SQS();
//send msg

// var params = {
//     // Remove DelaySeconds parameter and value for FIFO queues
//     DelaySeconds: 10,
//     MessageAttributes: {
//         Title: {
//             DataType: "String",
//             StringValue: "The Whistler",
//         },
//         Author: {
//             DataType: "String",
//             StringValue: "John Grisham",
//         },
//         WeeksOn: {
//             DataType: "Number",
//             StringValue: "6",
//         },
//     },
//     MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
//     QueueUrl: "https://sqs.ap-south-1.amazonaws.com/198229267074/omkar-q",
// };

// sqs.sendMessage(params, function(err, data) {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data.MessageId);
//     }
// });

//Recieve msg

var queueURL = "https://sqs.ap-south-1.amazonaws.com/198229267074/omkar-q";

var params = {
    AttributeNames: ["SentTimestamp"],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ["All"],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0,
};

sqs.receiveMessage(params, function(err, data) {
    if (err) {
        console.log("Receive Error", err);
    } else if (data.Messages) {
        console.log(data.Messages);
        var deleteParams = {
            QueueUrl: queueURL,
            ReceiptHandle: data.Messages[0].ReceiptHandle,
        };
        sqs.deleteMessage(deleteParams, function(err, data) {
            if (err) {
                console.log("Delete Error", err);
            } else {
                console.log("Message Deleted", data);
            }
        });
    }
});