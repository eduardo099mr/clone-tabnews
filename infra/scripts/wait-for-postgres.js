const { exec } = require("node:child_process");
let count = 0;

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      if (count % 2 == 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\x1b[33m⚪\x1b[0mPOSTGRES CARREGANDO ");
      }
      if (count % 2 !== 0) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write("\x1b[33m⚫\x1b[0mPOSTGRES CARREGANDO ");
      }
      count++;
      checkPostgres();
      return;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("\x1b[32m⚫\x1b[0mPOSTGRES CARREGADO\n");
  }
}

process.stdout.write("\n⚪POSTGRES CARREGANDO ");
checkPostgres();
