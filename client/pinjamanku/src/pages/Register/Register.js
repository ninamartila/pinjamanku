export default function Register() {
  return (
    <section class="register d-flex flex-column justify-content-center">
      <div class="container">
        <div class="row justify-content-end ">
          <div class="col-md-6 m-3 card register-card">
            <div class="p-5">
              <h1>PinjamanKu</h1>
              <form>
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleInputPassword1" class="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                  />
                </div>

                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Default file input example
                  </label>
                  <input class="form-control" type="file" id="formFile" />
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">
                    Default file input example
                  </label>
                  <input class="form-control" type="file" id="formFile" />
                </div>
                <button type="submit" class="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
