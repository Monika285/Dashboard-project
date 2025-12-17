if(!localStorage.getItem("loggedInUser")) window.location.href="login.html";

// Logout
document.getElementById("logoutBtn").addEventListener("click",()=>{
  localStorage.removeItem("loggedInUser");
  window.location.href="login.html";
});

// Users & Revenue Table
let usersList = [];
document.getElementById("addUserBtn").addEventListener("click",()=>{
  const username=document.getElementById("userInput").value.trim();
  const revenue=document.getElementById("revenueInput").value.trim();
  if(username && revenue){
    usersList.push({username,revenue});
    updateTable();
    document.getElementById("userInput").value='';
    document.getElementById("revenueInput").value='';
    document.getElementById("usersCard").textContent = usersList.length;
    let totalRevenue = usersList.reduce((sum,u)=>sum + parseFloat(u.revenue),0);
    document.getElementById("revenueCard").textContent = "$"+totalRevenue;
  } else alert("Enter username and revenue");
});

function updateTable(){
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML='';
  usersList.forEach(u=>{
    const tr=document.createElement("tr");
    tr.innerHTML=`<td>${u.username}</td><td>$${u.revenue}</td>`;
    tbody.appendChild(tr);
  });
}

// Reports toggle
document.querySelectorAll(".report-toggle").forEach(item=>{
  item.addEventListener("click",()=>{
    const content = item.nextElementSibling;
    content.style.display = content.style.display==="block"?"none":"block";
  });
});

// Submit report
document.getElementById("submitReport").addEventListener("click",()=>{
  const txt=document.getElementById("reportText").value.trim();
  if(txt){ alert("Report submitted: "+txt); document.getElementById("reportText").value=''; }
  else alert("Type your issue");
});

// Submit experience
document.getElementById("submitExperience").addEventListener("click",()=>{
  const txt=document.getElementById("experienceText").value.trim();
  if(txt){ alert("Experience submitted: "+txt); document.getElementById("experienceText").value=''; }
  else alert("Write your experience");
});

// Rating system
let selectedRating=0;
const stars = document.querySelectorAll(".star");
stars.forEach(star=>{
  star.addEventListener("mouseover",()=>{
    const val = parseInt(star.dataset.value);
    stars.forEach(s=>s.classList.remove("hover"));
    stars.forEach(s=>{ if(parseInt(s.dataset.value)<=val) s.classList.add("hover"); });
  });
  star.addEventListener("mouseout",()=>{
    stars.forEach(s=>s.classList.remove("hover"));
  });
  star.addEventListener("click",()=>{
    selectedRating = parseInt(star.dataset.value);
    stars.forEach(s=>s.classList.remove("selected"));
    stars.forEach(s=>{ if(parseInt(s.dataset.value)<=selectedRating) s.classList.add("selected"); });
  });
});

document.getElementById("submitRating").addEventListener("click",()=>{
  if(selectedRating>0){
    alert("Rating submitted: "+selectedRating+" stars");
    selectedRating=0;
    stars.forEach(s=>s.classList.remove("selected"));
  } else alert("Select rating first");
});