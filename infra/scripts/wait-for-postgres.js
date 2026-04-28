const { exec } = require("node:child_process");
let count = 0;

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      if (count % 2 == 0) {
        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
        process.stdout.write("\033[33m⚪\033[0mPOSTGRES CARREGANDO ");
      }
      if (count % 2 !== 0) {
        process.stdout.clearLine(1);
        process.stdout.cursorTo(0);
        process.stdout.write("\033[33m⚫\033[0mPOSTGRES CARREGANDO ");
      }
      count++;
      checkPostgres();
      return;
    }
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write("\033[32m⚫\033[0mPOSTGRES CARREGADO\n");
  }
}

process.stdout.write("\n⚪POSTGRES CARREGANDO ");
checkPostgres();
