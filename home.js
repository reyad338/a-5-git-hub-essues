// console.log('iftar por ses korbo in sha allah');

let currentTab = "all";
const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const spinerLoder = document.getElementById("loader");


function switchTab(tab) {
  currentTab = tab;
  document.getElementById("tab-all").classList.remove("btn-primary");
  document.getElementById("tab-open").classList.remove("btn-primary");
  document.getElementById("tab-closed").classList.remove("btn-primary");


  document.getElementById("tab-" + tab).classList.add("btn-primary");
  loadIssues();
};



function loadIssue() {
  spinerLoder.classList.remove("hidden");
  fetch(url)
    .then(res => res.json())
    .then(data => {
      let issues = data.data;
      console.log(issues);
      if (currentTab !== "all") {
        issues = issues.filter(issue => issue.status === currentTab);
      };
      displayIssues(issues);
      spinerLoder.classList.add("hidden");
    });
};

function loadIssues() {


  spinerLoder.classList.remove("hidden");


  fetch(url)
    .then(res => res.json())
    .then(data => {


      let issues = data.data;


      if (currentTab !== "all") {
        issues = issues.filter(issue => issue.status === currentTab);
      }


      displayIssues(issues);


      spinerLoder.classList.add("hidden");


    });


}

function displayIssues(issues) {

  const container = document.getElementById("issue-container");

  container.innerHTML = "";

  document.getElementById("issue-count").innerText = issues.length;

  issues.forEach(issue => {

    const border =
      issue.status === "open"
        ? "border-t-4 border-green-500 "
        : "border-t-4 border-purple-500";

    const priorityColor =
      issue.priority === "high"
        ? "badge-error"
        : issue.priority === "medium"
          ? "badge-warning"
          : "badge-ghost";


    const card = document.createElement("div");

    card.className = `bg-white p-4 rounded-lg shadow cursor-pointer ${border}`;

    card.innerHTML = `

      <div class="flex justify-between items-center mb-2">
        <span class="badge ${priorityColor} uppercase">${issue.priority}</span>
      </div>

      <h2 class="font-semibold text-lg mb-2">
        ${issue.title}
      </h2>

      <p class="text-sm text-gray-500 mb-3">
        ${issue.description.substring(0, 90)}...
      </p>

      <div class="flex gap-2 mb-3">
        ${issue.labels
        .map(label => `<span class="badge badge-outline badge-warning">${label}</span>`)
        .join("")}
      </div>

      <div class="text-xs text-gray-400 border-t pt-2">
        <p>#1 by ${issue.author}</p>
        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
      </div>

    `;

    card.onclick = () => showModal(issue);

    container.appendChild(card);

  });

}


function showModal(issue) {

  document.getElementById("modal-title").innerText = issue.title;

  document.getElementById("modal-description").innerText = issue.description;

  document.getElementById("modal-info").innerHTML = `
    <p><b>Status:</b> ${issue.status}</p>
    <p><b>Author:</b> ${issue.author}</p>
    <p><b>Assignee:</b> ${issue.assignee}</p>
    <p><b>Priority:</b> ${issue.priority}</p>
    <p><b>Labels:</b> ${issue.labels.join(", ")}</p>
    <p><b>Created:</b> ${new Date(issue.createdAt).toLocaleString()}</p>
  `;

  document.getElementById("issueModal").showModal();
};

function searchIssue(text) {


  if (text === "") {
    loadIssues();
    return;
  }


  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`)
    .then(res => res.json())
    .then(data => {


      displayIssues(data.data);


    });


}

switchTab("all");
loadIssues();