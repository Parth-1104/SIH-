// Function to load the CSV file and parse the data
function loadCSV(csvPath) {
    return fetch(csvPath)
        .then(response => response.text())
        .then(text => {
            const rows = text.split('\n').slice(1); // Skip the header row
            const labels = [];
            const data = [];
            rows.forEach(row => {
                const columns = row.split(',');
                if (columns.length >= 2) {
                    labels.push(columns[0]); // Date column
                    data.push(parseFloat(columns[1])); // Turbidity column
                }
            });
            return { labels, data };
        });
}

// Function to create and render the chart
function createChart(labels, data) {
    const ctx = document.getElementById('turbidityChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Turbidity',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: false,
                tension: 0.1,
                pointRadius: 5, // Points visible on the chart
                pointHoverRadius: 8 // Larger radius on hover
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Turbidity (Units)'
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true
                }
            }
        }
    });
}

// Load the CSV data and create the chart
loadCSV('ee-chart.csv').then(({ labels, data }) => {
    createChart(labels, data);
});
