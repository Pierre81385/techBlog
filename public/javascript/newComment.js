async function newFormHandler(event) {
  // event.preventDefault();

  console.log("trying to add a new comment");

  const comment_text = document
    .querySelector('input[name="commentBody"]')
    .value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  console.log("Post id is: " + post_id);

  const response = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      post_id,
      comment_text,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#commentForm")
  .addEventListener("submit", newFormHandler);
