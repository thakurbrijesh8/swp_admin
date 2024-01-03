<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Registration under "License for Dealer"</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Dealer</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="dealer_form_and_datatable_container">
    </div>
</section>
<form target="_blank" id="dealer_form1_pdf_form" action="dealer/generate_form1" method="post">
    <input type="hidden" id="dealer_id_for_dealer_form1" name="dealer_id_for_dealer_form1">
</form>
<form target="_blank" id="dealer_certificate_pdf_form" action="dealer/generate_certificate" method="post">
    <input type="hidden" id="dealer_id_for_certificate" name="dealer_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_dealer" action="dealer/generate_excel" method="post">
</form>