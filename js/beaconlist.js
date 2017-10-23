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
  "response": "Reason why this was correct here.",
  "ind":0,
  "onFind":function(){
    //what to do when beacon 1 is found
    alert('beacon 1 found');
    this.found = true;
    beaconFinder.stop();
    $scanning=false;
    $('.debutton1').text('START');
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
  "response": "Reason why this was correct here.",
  "ind":1,
  "onFind":function(){
    //what to do when beacon 2 is found
    alert('beacon 2 found');
    this.found = true;
    beaconFinder.stop();
    $scanning=false;
    $('.debutton1').text('START');
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
  "response": "Reason why this was correct here.",
  "ind":2,
  "onFind":function(){
    //what to do when beacon 3 is found
    alert("beacon 3 found")
    this.found = true;
    beaconFinder.stop();
    $scanning=false;
    $('.debutton1').text('START');
  }
}
];
