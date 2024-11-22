var siteNameInput = document.getElementById('siteNameInput');
var siteUrlInput = document.getElementById('siteUrlInput');

var siteDataList = [];
if (localStorage.getItem('SiteData') !== null) {
    siteDataList = JSON.parse(localStorage.getItem('SiteData'));
    display();

}



function addSiteData() {

    if (validation(siteNameInput) && validation(siteUrlInput)) {
        var siteData = {
            name: siteNameInput.value,
            url: siteUrlInput.value,
        }
        siteDataList.push(siteData);
        localStorage.setItem('SiteData', JSON.stringify(siteDataList));
        display();
        clearData();

    }
    else {
        Swal.fire({
            title: "Site Name or Url is not valid, Please follow the rules below :",
            text: `Site name must contain at least 3 characters and
        Site URL must be a valid one`,
            icon: "error"
        });
    }

}


function display() {
    var container = " ";
    for (var i = 0; i < siteDataList.length; i++) {
        container += `
        <tr>
                        <td>${i + 1}</td>
                        <td>${siteDataList[i].name}</td>
                        <td><button onclick="visit(${i})" class=" btn btn-success text-white"> <i class="fa-solid fa-eye pe-2"></i> Visit</button></td>
                        <td><button onclick="deleteData(${i})" class="  btn btn-danger text-white"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>
                       </tr>
        `;

    }
    document.getElementById('bodyTable').innerHTML = container;

}
function clearData() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
}

// var siteUrl;
function visit(i) {
    var siteUrl = siteDataList[i].url;
    window.open(siteUrl, '_blank');
}

function deleteData(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-3",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            siteDataList.splice(index, 1);
            localStorage.setItem('SiteData', JSON.stringify(siteDataList));
            display();
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });

        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });




}

function validation(ele) {

    var regex = {
        siteNameInput: /[a-z]{3,}/i,
        siteUrlInput: /https?:\/\/(www.)?\w+.\w+/i,
    }
    if (regex[ele.id].test(ele.value)) {

        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
        return true;
    }
    else {

        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        return false;
    }

}

