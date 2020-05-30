import "regenerator-runtime/runtime";
import "../styles/main.scss";

console.log(process.env.API_KEY);
class CreateRepo {
  constructor() {
    this.repoList = document.createElement("ul");
    this.spinner = document.querySelector(".sk-cube-grid");
    this.formData = {
      repoName: document.querySelector("#repo-name").value,
      description: document.querySelector("#description").value,
      type: document.querySelector("form").elements.definition.value,
      readMe: document.querySelector("#initialize-readme").checked
    };
    this.baseUrl = `https://api.github.com/user/repos`;
    this.generateList();
    this.generateRepo();
  }

  generateRepo() {
    let form = document.querySelector("form");
    this.spinner.classList.add("notActive");
    form.addEventListener("submit", async event => {
      try {
        event.preventDefault();
        document.querySelectorAll(".btn").forEach(btn => {
          btn.disabled = true;
        });
        this.spinner.classList.remove("notActive");
        this.spinner.classList.add("active");

        let user = {
          name: `${this.formData.repoName}`,
          description: `${this.formData.description}`,
          homepage: "https://github.com",
          private: this.formData.type === "private"
        };
        let options = {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${process.env.API_KEY}`,
            Accept: "application/json",
            "Access-Control-Request-Method": "POST"
          },
          mode: "cors"
        };
        let response = await fetch(this.baseUrl, options);
        let data = response.json();

        if (data) {
          this.generateList();
          this.spinner.classList.remove("active");
          this.spinner.classList.add("notActive");
          document.querySelectorAll(".btn").forEach(btn => {
            btn.disabled = false;
          });

          form.reset();
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  async generateList() {
    let gitArray = await fetch(this.baseUrl, {
      method: "GET",
      headers: {
        Authorization: `token ${process.env.API_KEY}`
      },
      mode: "cors"
    }).then(res => res.json());
    console.log(gitArray);
    gitArray = Array.from(gitArray).map(obj => {
      return `<li class="gitList">
          <a href="${obj.html_url}" class="git-link">
          <div class="right-container">
            <h3 class="repo-name">${obj.name}</h3>
            <p class="date">${obj.created_at}</p>
          </div>
          <div class="left-container">
            <p class="description">${obj.description}</p>
          </div>
          </a>
        </li>`;
    });
    let main = document.querySelector("main");
    let form = document.querySelector("form");
    this.repoList.innerHTML = gitArray.join("\n");
    main.insertBefore(this.repoList, form);
  }
}

new CreateRepo();
