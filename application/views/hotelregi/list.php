<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Hotel Registration</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Hotel Registration</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="hotelregi_datatable_container">
    </div>
    <div class="container-fluid" id="hotelregi_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="hotelregi_formII_pdf_form" action="hotelregi/generate_formII" method="post">
    <input type="hidden" id="hotelregi_id_for_hotelregi_formII" name="hotelregi_id_for_hotelregi_formII">
</form>
<form target="_blank" id="hotelregi_certificate_pdf_form" action="hotelregi/generate_certificate" method="post">
    <input type="hidden" id="hotelregi_id_for_certificate" name="hotelregi_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_hotelregi" action="hotelregi/generate_excel" method="post">
</form>