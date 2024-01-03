<div class="content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-8">
                <h1 class="m-0 text-dark"><i class="nav-icon fa fa-buildings"></i> Tourism Event for Performance License</h1>
            </div>
            <div class="col-sm-4">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="main#dashboard">Home</a></li>
                    <li class="breadcrumb-item active">Tourism Event for Performance License</li>
                </ol>
            </div>
        </div>
    </div>
</div>
<section class="content">
    <div class="container-fluid" id="tourismevent_datatable_container">
    </div>
    <div class="container-fluid" id="tourismevent_form_container" style="display: none;">
    </div>
</section>
<form target="_blank" id="tourismevent_form_pdf_form" action="tourismevent/generate_form" method="post">
    <input type="hidden" id="tourismevent_id_for_tourismevent_form" name="tourismevent_id_for_tourismevent_form">
</form>
<form target="_blank" id="tourismevent_certificate_pdf_form" action="tourismevent/generate_certificate" method="post">
    <input type="hidden" id="tourismevent_id_for_certificate" name="tourismevent_id_for_certificate">
</form>
<form target="_blank" id="generate_excel_for_tourismevent" action="tourismevent/generate_excel" method="post">
</form>