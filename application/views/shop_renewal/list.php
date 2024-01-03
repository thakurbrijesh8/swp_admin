<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Grant Of License for Shop & Establishment - Renewal</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Shop & Establishment Renewal</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="shop_renewal_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="shop_renewal_form_pdf_form" action="shop_renewal/generate_form" method="post">
    <input type="hidden" id="shop_renewal_id_for_shop_renewal_form" name="shop_renewal_id_for_shop_renewal_form">
</form>
<form target="_blank" id="shop_renewal_certificate_pdf_form" action="shop_renewal/generate_certificate" method="post">
    <input type="hidden" id="shop_renewal_id_for_certificate" name="shop_renewal_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_shop_renewal" action="shop_renewal/generate_excel" method="post">
</form>