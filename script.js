const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  // lấy ra đc giá trị khi click chọn vào
  fetch("https://open.exchangerate-api.com/v6/latest")
    // là một API đơn giản cho việc gửi và nhận requesst bằng js.
    // Với fetch thì việc thực hiện các yêu cầu web và xử lý phản hồi dễ dàng hơn
    .then((res) => res.json())
    // response
    .then((data) => {
      //  console.log(data);
      const rate = data.rates[currency_two] / data.rates[currency_one];
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      // hiển thị tỉ lệ rate giữa currency one and two
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      // hiển thị sau dấu chấm 2 chữ số ở giá trị đổi thứ 2
    });
}

// Event Listener
currencyEl_one.addEventListener("change", calculate);
// có thể bổ sung rất nhiều hành động vào sự kiện tại nhiều thời điểm khác nhau.
// gồm event name và do something
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
