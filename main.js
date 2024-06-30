document.addEventListener('DOMContentLoaded', function() {
    // Function to parse URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Function to fetch JSON data from URL
    function fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to find data by Record ID
    function findDataByID(data, recordID) {
        return data.find(item => item['RecordID'] === recordID);
    }

    const apiUrl = 'https://sheetdb.io/api/v1/tsr8rp02hr3vh';
    const recordIDToDisplay = getUrlParameter('RecordID');

    fetchData(apiUrl)
        .then(data => {
            const dataToDisplay = findDataByID(data, recordIDToDisplay);

            if (dataToDisplay) {
                // Sections 1
                document.getElementById('memberName').innerHTML = `${dataToDisplay['FIRST NAME']} ${dataToDisplay['MIDDLE NAME']} ${dataToDisplay['LAST NAME']}`;
                document.getElementById('memberDOB').innerHTML = dataToDisplay['BIRTH DATE'];
                
                // Sections 2
                document.getElementById('memberNickName').innerHTML = dataToDisplay['NICKNAME'];
                document.getElementById('customefbAccount').innerHTML = dataToDisplay['FB ACCOUNT'];
                document.getElementById('memberEmail').innerHTML = dataToDisplay['EMAIL ADDRESS']; 
                
                // Sections 3
                document.getElementById('nameOfOuTreach').innerHTML = dataToDisplay['NAME OF OUTREACH:']; 
                
                // Sections 4
                document.getElementById('homeAddress').innerHTML = dataToDisplay['HOME ADDRESS:']; 
                
                // Sections 5
                document.getElementById('civilStatus').innerHTML = dataToDisplay['CIVIL STATUS:']; 
                document.getElementById('memberHeight').innerHTML = dataToDisplay['HEIGHT (cm):']; 
                document.getElementById('memberWeight').innerHTML = dataToDisplay['WEIGHT (kl):']; 
                document.getElementById('memberBloodType').innerHTML = dataToDisplay['BLOOD TYPE:']; 
            } else {
                console.error("Record ID not found");
            }
        })
        .catch(error => console.error('Error processing data:', error));
});
