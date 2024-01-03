</div>
<?php $url = 'https://daman.nic.in/everify?ev=' . $barcode_number; ?>
<table class="table-header">
    <tr>
        <td style="vertical-align: bottom;">
            <div class="color-nic-blue footer-title">
                For Authenticity Verification of this Document. Scan QR or Enter Barcode at http://daman.nic.in/everify or
            </div>
            <div class="color-nic-blue footer-title">
                Visit <?php echo $url; ?>
            </div>
        </td>
        <td style="width: 50px;">
    <barcode disableborder="1" code="<?php echo $url; ?>" type="QR" size="0.7"/>
</td>
<td style="width: 100px;">
    <table style="width: 100%;">
        <tr>
            <td style="padding-left: 14px;">
                <img src="images/nic-logo-new.png" style="height: 20px;"> 
            </td>
        </tr>
        <tr>
            <td>
        <barcode code="<?php echo $barcode_number; ?>" type="I25" size="0.9" height="0.6"/>
</td>
</tr>
<tr>
    <td class="t-a-c footer-title">
        <div style="letter-spacing: 5px;"><?php echo $barcode_number; ?></div>
    </td>
</tr>
</table>
</td>
</tr>
</table>
</div>
</body>
</html>