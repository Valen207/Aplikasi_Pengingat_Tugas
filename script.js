let tugas = JSON.parse(localStorage.getItem("tugas")) || [];

function tambahTugas() {
  let judul = document.getElementById("judul").value;
  let deskripsi = document.getElementById("deskripsi").value;
  let tanggal = document.getElementById("deadline").value;
  let jam = document.getElementById("jam").value;

  if (judul === "" || deskripsi === "" || tanggal === "" || jam === "") {
    alert("Isi semua data!");
    return;
  }

  let deadline = tanggal + "T" + jam;

  tugas.push({ judul, deskripsi, deadline, status: "pending" });
  localStorage.setItem("tugas", JSON.stringify(tugas));

  tampilkan();
}

function hapusTugas(index) {
  tugas.splice(index, 1);
  localStorage.setItem("tugas", JSON.stringify(tugas));
  tampilkan();
}

function toggleStatus(index) {
  if (tugas[index].status === "pending") {
    tugas[index].status = "done";
    alert("🎉 Mantap! Tugas sudah kamu selesaikan!");
  } else {
    tugas[index].status = "pending";
    alert("💪 Ayo semangat! Jangan lupa selesaikan tugasnya!");
  }

  localStorage.setItem("tugas", JSON.stringify(tugas));
  tampilkan();
}

function toggleCard(element) {
  element.classList.toggle("active");
}

function tampilkan() {
  let list = document.getElementById("list");
  list.innerHTML = "";

  tugas.forEach((t, index) => {
    let li = document.createElement("li");

    let waktu = new Date(t.deadline).toLocaleString();
    let checked = t.status === "done" ? "checked" : "";

    li.innerHTML = `
      <div class="task-header">
        <input type="checkbox" ${checked} onclick="event.stopPropagation(); toggleStatus(${index})">
        <b>${t.judul}</b>
        <button onclick="event.stopPropagation(); hapusTugas(${index})">🗑</button>
      </div>

      <div class="detail">
        <div class="deskripsi">${t.deskripsi}</div>
        <div>${waktu}</div>
        <button class="selesai-btn" onclick="event.stopPropagation(); toggleStatus(${index})">Selesai</button>
      </div>
    `;

    li.onclick = () => toggleCard(li);

    list.appendChild(li);
  });
}

tampilkan();

function cekDeadline() {
  let sekarang = new Date();

  tugas.forEach(t => {
    let deadline = new Date(t.deadline);
    let selisih = (deadline - sekarang) / (1000 * 60 * 60 * 24);

    if (selisih <= 3 && selisih > 2) {
      alert("⏰ H-3: " + t.judul);
    }

    if (selisih <= 1 && selisih >= 0) {
      alert("🔥 H-1: " + t.judul + " SEGERA KERJAKAN!");
    }
  });
}

setInterval(cekDeadline, 60000);