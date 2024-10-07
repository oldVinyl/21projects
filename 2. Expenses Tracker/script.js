const tbody = document.getElementById("tbody");
const total = document.getElementById("grand-total");
const net = document.getElementById("net-val");
const stat = document.getElementById("status");

let sum = 0;
let str = ``;

function getItem () {
  const iname = document.getElementById("iname").value;
  const icost = +document.getElementById("icost").value * 100;
  const iqty = +document.getElementById("iqty").value;
  
  const gg = iname && icost && iqty ? {
    name: iname,
    ucost: +(icost/100).toFixed(2),
    qty: iqty,
    fcost: +((icost * iqty)/100).toFixed(2)
  } : false;

  document.getElementById("iname").value = "";
  document.getElementById("icost").value = "";
  document.getElementById("iqty").value = 1;

  return gg;
}

function addItem (item) {
  if (item) {
    sum += item.fcost;
    str += `
      <tr>
        <td>${item.name}</td>
        <td class="unit-cost">${item.ucost}</td>
        <td class="qty">${item.qty}</td>
        <td class="cost">${item.fcost}</td>
      </tr>
    `;
    tbody.innerHTML = str;
    total.innerText = sum;
    stat.innerText = "";

  } else {
    stat.innerText = "Empty Input Field!"
  }
}

function surDef () {
  
  if (sum != 0 || getItem())  {
    const inc = document.getElementById("inc").value;

    if (inc) {
      const outp = inc == sum ? "You broke even!" : `Your ${inc > sum ? "Surplus" : "Deficit"} is ${(inc - sum).toFixed(2)}`;
      net.innerText = outp;
      net.style.color = inc > sum && inc ?  "green" : "red";
    }
  } else {
    net.innerHTML = "Empty Input Field!"
  }
}
