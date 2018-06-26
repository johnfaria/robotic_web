var socket = io();

var app = new Vue({
    el: '#app', 
    data:{
        servo_1 : 90.,
        servo_2 : 90,
        servo_3 : 90,
        servo_4 : 10,
        temp_celcius: '',
        accel_x:'',
        accel_y:'',
        accel_z:'',
        gyro_x:'',
        gyro_y:'',
        gyro_z:'',

    },
    watch: {
        servo_1(new_value){
            socket.emit('leitura1',new_value)
        },
        servo_2(new_value){
            socket.emit('leitura2',new_value)
        },
        servo_3(new_value){
            socket.emit('leitura3',new_value)
        },
        servo_4(new_value){
            socket.emit('leitura4',new_value)
        },
    }
});

socket.on('MPU',function(data) {
    app.temp_celcius= data.temp_celcius;
    app.accel_x = data.accel_x;
    app.accel_y = data.accel_y;
    app.accel_z = data.accel_z;
    app.gyro_x = data.gyro_x;
    app.gyro_y = data.gyro_y;
    app.gyro_z = data.gyro_z;
});





