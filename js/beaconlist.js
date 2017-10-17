/*
Array of JSON objects used to set the current beacon.
*/
var beaconlist = [
{
  "major":100,
  "minors":[1,2],
  "text":'You found location 1.',
  "found":false,
  "name": "CD",
  "slug": "cd",
  "id": 100,
  "distractors":[
    {
      "name": "Pen",
      "slug": "pen"
    },
    {
      "name": "Wrench",
      "slug": "wrench"
    }
  ],
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
  "name": "Envelope",
  "slug": "envelope",
  "id": 200,
  "distractors":[
    {
      "name": "Knife",
      "slug": "knife"
    },
    {
      "name": "Calculator",
      "slug": "calculator"
    }
  ],
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
  "name": "USB",
  "slug": "usb",
  "id": 300,
  "distractors":[
    {
      "name": "Mouse",
      "slug": "mouse"
    },
    {
      "name": "Soda",
      "slug": "soda"
    }
  ],
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
