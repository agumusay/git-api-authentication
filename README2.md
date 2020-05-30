# Github API

...continuation from step 1...

7. Next, create your list item html. To make things easier, add it in the html with some dummy data, we will move it later on to the js.

![example repo list item in html](example-images/example-repo-list-item.png)

8. Let's adjust the css for a list, items should appear side by side, like for example:

![example repo list items in html](example-images/example-repo-list-items.png)

9. Once you are happy with the styles and html, move one list item to the js file. Create a function, that accepts one parameter (the repository data for 1 item), and returns an HTML string. Replace the dummy data that you had placed before with template variables, like for example ${repository.name}, where `repostitory` would be the name of the parameter you are passing to the function. The `.name` part is based on the data you receive from the API.

10. Next, let's get some data! Fetch the list of repositories from the Github API and display them as a list using the template function you just defined.

11. On initial load, fetch the repositories. After a new repository was created via the form submission, re-fetch the repositories so the new one appears in the list

12. Add extra params to your get repos list query, if you like, for example sorting order, or fetching only public repos, take a look at the docs what you could use.

> API endpoint: https://developer.github.com/v3/repos/#list-repositories-for-the-authenticated-user