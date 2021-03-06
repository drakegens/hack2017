$(document).ready(function() {
 //handling add new item to registry button
  $("#a").click(function addAnotherItemForm() {
    $('#listOfItems').append(`<div class="registry-item">
  <div class="form-group">
    <label class="col-sm-3 control-label" for="nameOfItem[]">Item Name</label>
    <div class="col-sm-7">
      <input class="form-control" type="text" name="nameOfItem[]" id="nameOfItem"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label" for="itemPrice[]">Price</label>
    <div class="col-sm-7">
      <div class="input-group">
        <div class="input-group-addon">$</div>
        <input class="form-control" type="number" name="itemPrice[]" id="itemPrice"/>
      </div>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label" for="itemDescription[]">Description</label>
    <div class="col-sm-7">
      <input class="form-control" type="text" name="itemDescription[]" id="itemDescription"/>
    </div>
  </div>
  <div class="form-group">
    <label class="col-sm-3 control-label" for="itemURL[]">Item URL (Optional)</label>
    <div class="col-sm-7">
      <input class="form-control" type="text" name="itemURL[]" id="itemURL"/>
    </div>
  </div>
</div>`);
  })
});