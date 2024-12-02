<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Seller of Plot For Lease</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Seller of Plot</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="seller_datatable_container">
    </div>
    <div class="container-fluid" id="seller_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="seller_form1_pdf_form" action="seller/generate_form1" method="post">
    <input type="hidden" id="seller_id_for_seller_form1" name="seller_id_for_seller_form1">
</form>
<form target="_blank" id="seller_certificate_pdf_form" action="seller/generate_certificate" method="post">
    <input type="hidden" id="seller_id_for_certificate" name="seller_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_seller" action="seller/generate_excel" method="post">
</form>