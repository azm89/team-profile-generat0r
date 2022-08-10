// Export function to generate HTML page
module.exports = team => {
    return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Team Profile Generat0r</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="../templates/css/style.css">
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>

    <body>
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 jumbotron mb-3">
                    <h1 class="text-center">The Team</h1>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="team-area col-12 d-flex justify-content-center">
                    ${createProfile(team)}
                </div>
            </div>
        </div>
    </body>

    </html>
    `;
};

// Create Team Profile
const createProfile = team => {

    // Create Manager Profile
    const createManager = manager => {
        return `
        <div class="card employee-card">
            <div class="card-header card2">
                <h2 class="card-title">${manager.getName()}</h2>
                <h4 class="card-title"><i class="fas fa-mug-hot mr-2"></i>${manager.getRole()}</h4>
            </div>
            <div class="card-body card3">
                <ul class="list-group">
                    <li class="list-group-item card1">ID: ${manager.getId()}</li>
                    <li class="list-group-item card1">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></li>
                    <li class="list-group-item card1">Office number: <a href="tel:${manager.getOfficeNumber()}">${manager.getOfficeNumber()}</a></li>
                </ul>
            </div>
        </div>
        `;
    };

    // Create Engineer Profile
    const createEngineer = engineer => {
        return `
        <div class="card employee-card engineer-card">
            <div class="card-header card2">
                <h2 class="card-title">${engineer.getName()}</h2>
                <h4 class="card-title"><i class="fas fa-glasses mr-2"></i>${engineer.getRole()}</h4>
            </div>
            <div class="card-body card3">
                <ul class="list-group">
                    <li class="list-group-item card1">ID: ${engineer.getId()}</li>
                    <li class="list-group-item card1">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></li>
                    <li class="list-group-item card1">GitHub: <a href="https://github.com/${engineer.getGithub()}" target="_blank" rel="noopener noreferrer">${engineer.getGithub()}</a></li>
                </ul>
            </div>
        </div>
        `;
    };

    // Create Intern Profile
    const createIntern = intern => {
        return `
        <div class="card employee-card">
            <div class="card-header card2">
                <h2 class="card-title">${intern.getName()}</h2>
                <h4 class="card-title"><i class="fas fa-user-graduate mr-2"></i>${intern.getRole()}</h4>
            </div>
            <div class="card-body card3">
                <ul class="list-group">
                    <li class="list-group-item card1">ID: ${intern.getId()}</li>
                    <li class="list-group-item card1">Email: <a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></li>
                    <li class="list-group-item card1">School: ${intern.getSchool()}</li>
                </ul>
            </div>
        </div>
        `;
    };

    const html = [];

    html.push(team
        .filter(employee => employee.getRole() === 'Manager')
        .map(manager => createManager(manager))
    );
    html.push(team
        .filter(employee => employee.getRole() === 'Engineer')
        .map(engineer => createEngineer(engineer))
        .join("")
    );
    html.push(team
        .filter(employee => employee.getRole() === 'Intern')
        .map(intern => createIntern(intern))
        .join("")
    );

    return html.join("");

}
