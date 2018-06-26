var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);

var five = require("johnny-five");

var ports = [
    { id: "A", port: "/dev/ttyACM0" },
    { id: "B", port: "/dev/ttyACM1" }
  ];
  
new five.Boards(ports).on("ready", function() {
    
    var servo1 = new five.Servo({
        pin: 9,
        range: [0,180],
        startAt: 80,
        board: this.byId("A")
      });
      var servo2 = new five.Servo({
        pin: 10,
        range: [70,115],
        startAt: 90,
        board: this.byId("A")
      });
      var servo3 = new five.Servo({
        pin: 11,
        range: [80,120],
        startAt: 90,
        board: this.byId("A")
      });
      var servo4 = new five.Servo({
        pin: 3,
        range: [10,40],
        startAt: 11,
        board: this.byId("A")
      });
      
      var imu = new five.IMU({
        controller: "MPU6050",
        board: this.byId("B")
      });

      io.on("connection",function(socket){
        console.log("Ocorreu uma conexão");
        
        socket.on('leitura1',function (value) {
          console.log('Servo1: '+ value);
          servo1.to(value)
        })
    
        socket.on('leitura2',function (value) {
          console.log('Servo2: '+ value);
          servo2.to(value)
        })
    
        socket.on('leitura3',function (value) {
          console.log('Servo3: '+ value);
          servo3.to(value)
        })
    
        socket.on('leitura4',function (value) {
          console.log('Servo4: '+ value);
          servo4.to(value)
        })

        imu.on("change", function() {
          
          io.sockets.emit('MPU',
          {
            temp_celcius: this.thermometer.celsius,
            accel_x: this.accelerometer.x,
            accel_y: this.accelerometer.y,
            accel_z: this.accelerometer.z,
            gyro_x: this.gyro.x,
            gyro_y: this.gyro.y,
            gyro_z: this.gyro.z
          });
          console.log("Thermometer");
          console.log("  celsius      : ", this.thermometer.celsius);
          console.log("  fahrenheit   : ", this.thermometer.fahrenheit);
          console.log("  kelvin       : ", this.thermometer.kelvin);
          console.log("--------------------------------------");
      
          console.log("Accelerometer");
          console.log("  x            : ", this.accelerometer.x);
          console.log("  y            : ", this.accelerometer.y);
          console.log("  z            : ", this.accelerometer.z);
          console.log("  pitch        : ", this.accelerometer.pitch);
          console.log("  roll         : ", this.accelerometer.roll);
          console.log("  acceleration : ", this.accelerometer.acceleration);
          console.log("  inclination  : ", this.accelerometer.inclination);
          console.log("  orientation  : ", this.accelerometer.orientation);
          console.log("--------------------------------------");
      
          console.log("Gyroscope");
          console.log("  x            : ", this.gyro.x);
          console.log("  y            : ", this.gyro.y);
          console.log("  z            : ", this.gyro.z);
          console.log("  pitch        : ", this.gyro.pitch);
          console.log("  roll         : ", this.gyro.roll);
          console.log("  yaw          : ", this.gyro.yaw);
          console.log("  rate         : ", this.gyro.rate);
          console.log("  isCalibrated : ", this.gyro.isCalibrated);
          console.log("--------------------------------------");

        });
      
        
      });
      
    // Start
    this.repl.inject({
    
    servo: {servo1, servo2, servo3, servo4}
    
    });
    
  });

//-------------------------------------------
app.use(express.static(__dirname + '/'));

app.get('/',function (req, res) {
  res.sendFile(__dirname+'/index.html');
})

server.listen(8000, function () {
  console.log('Servidor porta 8000');
})
