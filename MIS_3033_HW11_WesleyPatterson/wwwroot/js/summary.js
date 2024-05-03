'use strict ';


async function loadSummary() {

    let chart1 = null;
    let chart2 = null;
    let chart3 = null;

    let fd = new FormData();


    let url = rootpath + 'Home/GetSummary';

    let opts = {
        method: 'POST',
        body: fd,
        cache: 'no-store',
    }

    let response = await fetch(url, opts);
    let rj = await response.json();

    let canvas1 = document.querySelector('#canvas1');
    let canvas2 = document.querySelector('#canvas2');
    let canvas3 = document.querySelector('#canvas3');

    if (chart1 != null) {
        chart1.destroy();
    }
    if (chart2 != null) {
        chart2.destroy();
    }
    if (chart3 != null) {
        chart3.destroy();
    }

    chart1 = new Chart(canvas1, {
        type: "pie",
        data: {
            labels: rj.map(x => x.l),
            datasets: [
                {
                    label: `Letter Grade`,
                    data: rj.map(x => x.n),
                },
            ],
        }
    });

    chart2 = new Chart(canvas2, {
        type: "bar",
        data: {
            labels: rj.map(x => x.l),
            datasets: [
                {
                    label: `Number`,
                    data: rj.map(x => x.n),
                },
            ],
        }
    });

    chart3 = new Chart(canvas3, {
        type: "line",
        data: {
            labels: rj.map(x => x.l),
            datasets: [
                {
                    label: `Number`,
                    data: rj.map(x => x.n),
                },
            ],
        }
    });
    swal.fire(`Course Loaded ${cid}`);
}
loadSummary();