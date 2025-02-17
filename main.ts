input.onButtonPressed(Button.A, function () {
    pksdriver.MotorRun(pksdriver.Motors.M1, pksdriver.Dir.CW, 100)
    pksdriver.MotorRun(pksdriver.Motors.M2, pksdriver.Dir.CW, 100)
})
let water_level = 0
let second = 0
let minute = 0
let hour = 0
let weekday = 0
let day = 0
let month = 0
let YEAR = 0
let control_brightness = 0
OLED12864_I2C.init(60)
let ds = DS1302.create(DigitalPin.P13, DigitalPin.P14, DigitalPin.P15)
let control_temperature = 28
control_brightness += 80
music.stopAllSounds()
pksdriver.MotorRun(pksdriver.Motors.M1, pksdriver.Dir.CW, 0)
pksdriver.MotorRun(pksdriver.Motors.M2, pksdriver.Dir.CW, 0)
pksdriver.MotorRun(pksdriver.Motors.M3, pksdriver.Dir.CW, 0)
pksdriver.MotorRun(pksdriver.Motors.M4, pksdriver.Dir.CW, 0)
ds.DateTime(
2025,
2,
10,
1,
9,
300,
0
)
basic.forever(function () {
    YEAR = ds.getYear()
    month = ds.getMonth()
    day = ds.getDay()
    weekday = ds.getWeekday()
    hour = ds.getHour()
    minute = ds.getMinute()
    second = ds.getSecond()
    OLED12864_I2C.showString(
    0,
    0,
    "" + day + "/" + month + "/" + YEAR + "",
    1
    )
    if (weekday == 1) {
        OLED12864_I2C.showString(
        0,
        1,
        "Mon",
        1
        )
    } else if (weekday == 2) {
        OLED12864_I2C.showString(
        0,
        1,
        "Tue",
        1
        )
    } else if (weekday == 3) {
        OLED12864_I2C.showString(
        0,
        1,
        "Wed",
        1
        )
    } else if (weekday == 4) {
        OLED12864_I2C.showString(
        0,
        1,
        "Thr",
        1
        )
    } else if (weekday == 5) {
        OLED12864_I2C.showString(
        0,
        1,
        "Fri",
        1
        )
    } else if (weekday == 6) {
        OLED12864_I2C.showString(
        0,
        1,
        "Sat",
        1
        )
    } else if (weekday == 7) {
        OLED12864_I2C.showString(
        0,
        1,
        "Sun",
        1
        )
    }
})
loops.everyInterval(5000, function () {
    music.stopAllSounds()
    water_level = pins.analogReadPin(AnalogPin.P0)
    if (water_level > 500) {
        music.ringTone(262)
        music.setVolume(255)
        if (input.temperature() >= control_temperature) {
            pksdriver.MotorRun(pksdriver.Motors.M3, pksdriver.Dir.CW, 150)
        } else {
            pksdriver.MotorRun(pksdriver.Motors.M3, pksdriver.Dir.CW, 0)
        }
        if (hour > 6 && hour < 18) {
            if (input.lightLevel() < control_brightness) {
                pksdriver.MotorRun(pksdriver.Motors.M1, pksdriver.Dir.CW, 10)
            } else {
                pksdriver.MotorRun(pksdriver.Motors.M1, pksdriver.Dir.CW, 0)
            }
        } else {
            pksdriver.MotorRun(pksdriver.Motors.M1, pksdriver.Dir.CW, 100)
            pksdriver.MotorRun(pksdriver.Motors.M2, pksdriver.Dir.CW, 100)
        }
    }
})
