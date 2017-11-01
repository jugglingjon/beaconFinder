/*
Array of JSON objects used to set the current beacon.
*/
var beaconlist = [
{
  "major":100,
  "minors":[1,2],
  "text":'You found location 1.',
  "found":false,
  "name": "Tool",
  "slug": "tool",
  "id": 100,
  "distractors":[
    {
      "name": "Cup",
      "slug": "cup"
    },
    {
      "name": "Cigarette",
      "slug": "cigarette"
    }
  ],
  "response": "The tool is best option to answer the PIR. Tool marks can be linked to a specific tool. And, fingerprints on the tool may link to Khaled Hajar. While the cigarette and cup provide biometric data, Khaled Hajar’s identity is confirmed. Neither the cigarette nor cup are IED components, giving these items little value in linking Hajar to IED making activities.",
  "ind":0,
  "onFind":function(){
    //what to do when beacon 1 is found
    if(!this.found){
      this.found = true;
      foundBeacon(this.id);
    }
  }
},
{
  "major":200,
  "minors":[1,2],
  "text":'You found location 2.',
  "found":false,
  "name": "Shirt",
  "slug": "shirt",
  "id": 200,
  "distractors":[
    {
      "name": "Twine",
      "slug": "twine"
    },
    {
      "name": "Paper",
      "slug": "paper"
    }
  ],
  "response": "The shirt is the best option to answer the PIR. It’s not unusual to find clothing in a residence; however, this shirt has several burns on the sleeves, which can be analyzed for HME precursors. The twine and paper offer little forensic value to link Hajar to IED making activities—neither is an IED component and both are common supplies.",
  "ind":1,
  "onFind":function(){
    //what to do when beacon 2 is found
    if(!this.found){
      this.found = true;
      foundBeacon(this.id);
    }
  }
},
{
  "major":300,
  "minors":[1,2],
  "text":'You found location 3.',
  "found":false,
  "name": "Tape",
  "slug": "tape",
  "id": 300,
  "distractors":[
    {
      "name": "Passport",
      "slug": "passport"
    },
    {
      "name": "Magazine",
      "slug": "magazine"
    }
  ],
  "response": "The electrical tape is the best option to answer the PIR. Forensic analysts can compare tape used on an IED to the tape found here. Tape is also a source of DNA and fingerprints, which can potentially link an IED to Khaled Hajar. Passports can confirm a person’s identity; however, Hajar’s identify is confirmed. The magazine only offers insight into Hajar’s interests, not IED making activities.",
  "ind":2,
  "onFind":function(){
    //what to do when beacon 3 is found
    if(!this.found){
      this.found = true;
      foundBeacon(this.id);
    }
  }
}
];


