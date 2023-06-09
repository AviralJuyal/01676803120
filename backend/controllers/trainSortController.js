const { default: axios } = require("axios");
const { getTrainsInNext12hrs } = require("../functions/getTrainsInNext12hrs");
require("dotenv").config();

//this func gets the data from main server and sorts it and gives data of all trains
exports.getTrainData = async (req, res) => {
  try {
    //it stores the auth token
    let auth_token = "";

    //it stores the train data
    let trainsData = [];

    //this api gets the auth token from server
    axios({
      method: "post",
      url: `${process.env.API_URL}/auth`,
      responseType: "json",
      data: {
        companyName: process.env.COMPANY_NAME,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        ownerName: process.env.OWNER_NAME,
        ownerEmail: process.env.OWNER_EMAIL,
        rollNo: process.env.ROLL_NO,
      },
    }).then(function (response) {
      auth_token = response.data.access_token;

      //this api gets the train details by using the auth token generated from above api
      axios({
        method: "get",
        url: `${process.env.API_URL}/trains`,
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
      }).then(function (response) {
        trainsData = response.data;
        // console.log(response.data[0])

        //getting trains which are departing in next 12 hrs
        trainsData = getTrainsInNext12hrs(trainsData);

        //sorting array based on price (the cost of sleeper is less than that of ac so it will be sorted first) in ascending order
        trainsData.sort((a, b) => a.price.sleeper - b.price.sleeper);

        //sorting array based on seats available by adding both sleeper and ac seats in descending order
        trainsData.sort((a, b) => {
          const aTotalSeats = a.seatsAvailable.sleeper + a.seatsAvailable.AC;
          const bTotalSeats = b.seatsAvailable.sleeper + b.seatsAvailable.AC;
          return bTotalSeats - aTotalSeats;
        });

        //sorting the array based on departure time in descending order
        trainsData.sort((a, b) => {
          if (a.departureTime.Hours !== b.departureTime.Hours) {
            return a.departureTime.Hours - b.departureTime.Hours;
          } else if (
            a.departureTime.Minutes + a.delayedBy !==
            b.departureTime.Minutes + b.delayedBy
          ) {
            return (
              a.departureTime.Minutes +
              a.delayedBy -
              b.departureTime.Minutes +
              b.delayedBy
            );
          } else {
            return a.departureTime.Seconds - b.departureTime.Seconds;
          }
        });

        res.send({ success: true, trainsData });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};

exports.getSelectedData = async (req, res) => {
  try {
    //stores auth token
    let auth_token = "";

    //api to get auth token
    axios({
      method: "post",
      url: `${process.env.API_URL}/auth`,
      responseType: "json",
      data: {
        companyName: "aviral travels",
        clientID: "79f04f0f-cd04-4f81-8a1f-cfe7d2b2e933",
        clientSecret: "aNvhHLITWJcJKzJs",
        ownerName: "aviral",
        ownerEmail: "aviraljuyal@gmail.com",
        rollNo: "01676803120",
      },
    }).then(function (response) {
      //storing auth token
      auth_token = response.data.access_token;

      //getting detail of a specific train
      axios({
        method: "get",
        url: `${process.env.API_URL}/trains/${req.params.id}`,
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth_token}`,
        },
      }).then(function (response) {
        // sending the response
        res.send({ success: true, train: response.data });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, msg: "some error occured" });
  }
};
