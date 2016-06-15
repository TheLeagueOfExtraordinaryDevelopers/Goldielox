app.factory("spindle", function ($rootScope) {

  var spindle = {
    flippers: [],

    // Load spindle full of albums
    load: function(albums) {

      this.flippers = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ];


      // Load albums.
      this.flippers[0].sideOne = albums[13];
      this.flippers[0].sideTwo = albums[14];

      this.flippers[1].sideOne = albums[15];
      this.flippers[1].sideTwo = albums[16];

      this.flippers[2].sideOne = albums[17];
      this.flippers[2].sideTwo = albums[18];

      this.flippers[3].sideOne = albums[19];
      this.flippers[3].sideTwo = albums[20];

      this.flippers[4].sideOne = albums[21];
      this.flippers[4].sideTwo = albums[22];

      this.flippers[5].sideOne = albums[23];
      this.flippers[5].sideTwo = albums[0];

      this.flippers[6].sideOne = albums[1];
      this.flippers[6].sideTwo = albums[2];

      this.flippers[7].sideOne = albums[3];
      this.flippers[7].sideTwo = albums[4];

      this.flippers[8].sideOne = albums[5];
      this.flippers[8].sideTwo = albums[6];

      this.flippers[9].sideOne = albums[7];
      this.flippers[9].sideTwo = albums[8];

      this.flippers[10].sideOne = albums[9];
      this.flippers[10].sideTwo = albums[10];

      this.flippers[11].sideOne = albums[11];
      this.flippers[11].sideTwo = albums[12];


      this.trigger('load');
    }

  }

  _.extend(spindle, Backbone.Events);

  return spindle;
});
