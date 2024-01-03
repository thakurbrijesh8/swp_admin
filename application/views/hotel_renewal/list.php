<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Grant Of License for Hotel - Renewal</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Hotel Renewal</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="hotel_renewal_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="hotel_renewal_form_pdf_form" action="hotel_renewal/generate_form" method="post">
    <input type="hidden" id="hotel_renewal_id_for_hotel_renewal_form" name="hotel_renewal_id_for_hotel_renewal_form">
</form>
<form target="_blank" id="hotel_renewal_certificate_pdf_form" action="hotel_renewal/generate_certificate" method="post">
    <input type="hidden" id="hotel_renewal_id_for_certificate" name="hotel_renewal_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_hotel_renewal" action="hotel_renewal/generate_excel" method="post">
</form>