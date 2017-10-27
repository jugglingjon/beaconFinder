/*
Array of JSON objects used to set the current beacon.
*/
var beaconlist = [
{
  "major":100,
  "minors":[1,2],
  "text":'You found location 1.',
  "found":false,
  "name": "Phone",
  "slug": "phone",
  "id": 100,
  "distractors":[
    {
      "name": "Papers",
      "slug": "papers"
    },
    {
      "name": "VHS",
      "slug": "vhs"
    }
  ],
  "response": "Many tools used to manufacture IEDs make marks that can be linked to a specific tool. Forensic analysts may be able to link the wire cutters to the IED as well as capture DNA to associate Hajar with IED making activities.",
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
  "name": "VHS",
  "slug": "vhs",
  "id": 200,
  "distractors":[
    {
      "name": "Phone",
      "slug": "phone"
    },
    {
      "name": "Papers",
      "slug": "papers"
    }
  ],
  "response": "Hajar is a tailor, so it would not be unusual to find clothing in a tailor’s business or residence; however, this clothing has several burns on the front. A Forensic chemist can analyze the residue to determine if it is a precursor used in the manufacture of HME.",
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
  "name": "Papers",
  "slug": "papers",
  "id": 300,
  "distractors":[
    {
      "name": "Phone",
      "slug": "phone"
    },
    {
      "name": "VHS",
      "slug": "vhs"
    }
  ],
  "response": "The tape can be forensically analyzed to link the device to a specific person or IED. Analysts can compare tape used on the IED to the tape found here. Tape is also an excellent source of DNA, which can link a device to a suspected bombmaker.",
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
