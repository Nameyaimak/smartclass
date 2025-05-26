function compareTime() {
  const now = new Date();
  const TIME_LIMIT = "09:00";
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  return currentTime > TIME_LIMIT ? "late" : "on-time";
}

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
    const status = compareTime();
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
