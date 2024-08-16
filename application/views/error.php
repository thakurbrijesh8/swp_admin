<?php $base_url = base_url(); ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>EODB ADMIN | Error</title>
        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php $this->load->view('common/css_links', array('base_url' => $base_url)); ?>
        <?php $this->load->view('common/js_links', array('base_url' => $base_url)); ?>
    </head>
    <body class="hold-transition layout-top-nav">
        <div class="wrapper">
            <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
                <div class="container">
                    <span class="brand-text font-weight-light" style="font-weight: bold !important; font-size: 25px !important;"><span class="d-sm-block d-md-none d-lg-none">EODB ADMIN</span> <span class="d-none d-md-block d-lg-block">EODB ADMIN</span></span>
                </div>
            </nav>
            <div class="content-wrapper">
                <section class="content" style="padding-top: 10%;">
                    <div class="error-page text-center" style="margin: 0px auto 0;">
                        <h1 class="text-danger" style="font-size: 50px;">
                            <i class="fas fa-exclamation-triangle"></i>  <?php echo isset($error_message) ? $error_message : ''; ?>
                        </h1>
                    </div>
                </section>
            </div>
            <?php $this->load->view('common/footer_text'); ?>
        </div>
    </body>
</html>
