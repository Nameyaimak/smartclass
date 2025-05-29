
function compareTime(deadline) {
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  return currentTime > deadline ? "late" : "on-time";
}
document.addEventListener("DOMContentLoaded", function () {
  const startTimeInput = document.getElementById("startTime");
  const lateTimeInput = document.getElementById("lateTime");

  function addMinutesToTime(timeStr, minutesToAdd) {
    if (!timeStr) return "";
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);
    return date.toTimeString().slice(0, 5); // คืนค่าเป็นรูปแบบ HH:MM
  }

  function updateLateTimeFromStart() {
    const startTime = startTimeInput.value;
    if (startTime) {
      const calculatedLateTime = addMinutesToTime(startTime, 15);
      lateTimeInput.value = calculatedLateTime;
    }
  }

  // อัปเดตเวลาสายทันทีที่เปลี่ยนเวลาเริ่มเรียน
  startTimeInput.addEventListener("change", updateLateTimeFromStart);

  // เรียกทีแรกด้วย เผื่อมีค่าอยู่แล้ว
  updateLateTimeFromStart();
  function updateClock() {
    const now = new Date();
    const currentTime = now.toLocaleTimeString("th-TH", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    document.getElementById("currentTimeDisplay").textContent = `🕒 ขณะนี้เวลา: ${currentTime}`;
  }

  setInterval(updateClock, 1000);
  updateClock();
});
function getThaiTime() {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")} น.`;
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("scanForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const lateTime = document.getElementById("lateTime").value;
    if (!lateTime) {
      alert("⛔ ⛔ กรุณากรอกเวลาให้ครบทั้ง 3 ช่อง!");
      return;
    }
    const status = compareTime(lateTime);
    const time = getThaiTime();

    const data = { name, id, time, status };

    fetch(
      "https://script.google.com/macros/s/AKfycbxbSY5M1yJ1NpSqkqnul5IDl3lRegxy6u2ondQRkYI6WsZYXO3zAxeseJoDOWJSyfH0zQ/exec",
      {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then(() => {
        alert("ส่งข้อมูลสำเร็จ!");
        const list = document.getElementById("list");
        const ding = document.getElementById("ding");
        const message = document.getElementById("message");

        const li = document.createElement("li");
        li.className =
          "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
        ${name} (${id}) 
        <span class="status ${status}">${
          status === "on-time" ? "ตรงเวลา" : "สาย"
        } ⏰</span>
      `;
        list.insertBefore(li, list.firstChild);

        ding.play();
        message.style.display = "block";
        message.textContent = "✅ เช็คชื่อเรียบร้อย!";

        form.reset();
      })
      .catch((err) => {
        alert("ส่งข้อมูลไม่สำเร็จ: " + err.message);
      });

    // const scriptURL = ;

    // fetch(scriptURL, {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: { "Content-Type": "application/json" },
    //   mode: 'no-cors',
    // })
    //   .then((response) => {
    //     if (response.ok) {

    //       setTimeout(() => {
    //         message.style.display = "none";
    //       }, 2500);
    //     } else {
    //       alert("❌ มีปัญหาในการส่งข้อมูล");
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error!", err.message);
    //     alert("❌ ไม่สามารถเชื่อมต่อได้");
    //   });
  });
});
