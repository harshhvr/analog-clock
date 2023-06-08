// functions.js

function analogClock(clockSelector, pointerSelectorAll) {
  const clock = document.querySelector(clockSelector);
  const pointers = clock.querySelectorAll(pointerSelectorAll);

  setInterval(() => {
    const d = new Date();

    let h, m, s, ms;

    h = d.getHours();
    m = d.getMinutes();
    s = d.getSeconds();
    ms = d.getMilliseconds();

    let pointer_point = {
      hours: hmsms2h(h, m, s, ms),
      minutes: msms2m(m, s, ms),
      seconds: sms2s(s, ms),
    };

    pointer_point.hours =
      pointer_point.hours > 12 ? pointer_point.hours - 12 : pointer_point.hours;

    // console.log("pointer_point", pointer_point);

    let pointer_degree = {
      hours: getHourPointerPosInDeg(pointer_point.hours),
      minutes: getMinutePointerPosInDeg(pointer_point.minutes),
      seconds: getSecondPointerPosInDeg(pointer_point.seconds),
    };

    pointer_degree.seconds = multipleOf6(parseInt(pointer_degree.seconds));

    // console.log("pointer_degree", pointer_degree);

    pointers.forEach((pointer) => {
      // Hour Pointer
      if (pointer.dataset.pointerType === "hour") {
        const transform = `translate(-50%,-50%) rotate(${pointer_degree.hours}deg)`;
        pointer.style.transform = transform;
        pointer.setAttribute("data-pointer-value", pointer_degree.hours);
      }

      // Minute Pointer
      if (pointer.dataset.pointerType === "minute") {
        const transform = `translate(-50%,-50%) rotate(${pointer_degree.minutes}deg)`;
        pointer.style.transform = transform;
        pointer.setAttribute("data-pointer-value", pointer_degree.minutes);
      }

      // Second Pointer
      if (pointer.dataset.pointerType === "second") {
        const transform = `translate(-50%,-50%) rotate(${pointer_degree.seconds}deg)`;
        pointer.style.transform = transform;
        pointer.setAttribute("data-pointer-value", pointer_degree.seconds);
      }
    });
  }, 1000);

  // Get a number in multiple of 6
  function multipleOf6(n) {
    return 6 * Math.ceil(n / 6);
  }

  // Get hours pointer position in degrees
  function getHourPointerPosInDeg(hour_point_value) {
    return (hour_point_value / 12) * 360;
  }
  // Get minutes pointer position in degrees
  function getMinutePointerPosInDeg(minute_point_value) {
    return (minute_point_value / 60) * 360;
  }
  // Get seconds pointer position in degrees
  function getSecondPointerPosInDeg(seconds_point_value) {
    return (seconds_point_value / 60) * 360;
  }

  // Get total hours
  function hmsms2h(h, m, s, ms) {
    return h + m2h(m) + s2h(s) + ms2h(ms);
  }
  function m2h(m) {
    return m / 60;
  }
  function s2h(s) {
    return s / (60 * 60);
  }
  function ms2h(ms) {
    return ms / (60 * 60 * 1000);
  }

  // Get total minutes
  function msms2m(m, s, ms) {
    return m + s2m(s) + ms2m(ms);
  }
  function s2m(s) {
    return s / 60;
  }
  function ms2m(ms) {
    return ms / (60 * 1000);
  }

  // Get total milliseconds
  function sms2s(s, ms) {
    return s + ms2s(ms);
  }
  function ms2s(ms) {
    return ms / 1000;
  }
}
