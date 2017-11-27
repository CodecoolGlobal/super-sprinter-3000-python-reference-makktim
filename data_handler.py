def get_all_user_story():
    user_stories = [
        {
            "id": 1,
            "title": "List all User Stories",
            "story": """
                As a User,
                I want to see all the previously saved User stories,
                So I get an overview of all requirements
            """,
            "criteria": """
                Given that there are any number ({0..n}) of saved User Stories,
                When I open the website (`/`),
                Then ensure I see a table with all the stored data,
                And if there is no stored data,
                Then hide the table
            """,
            "value": 1000,
            "estimation": 2,
            "status": "new"
        },
        {
            "id": 2,
            "title": "Add new User Stories",
            "story": """
                As a User,
                I want to be able to add a new User stories,
                So I can extend the list of requirements
            """,
            "criteria": """
                When I open the website (`/`),
                And I click the "Add User Story" link
                Then ensure I see form where I can add details of the new User Story,
                And if I submit the form, this US gets saved.
            """,
            "value": 800,
            "estimation": 4,
            "status": "new"
        }
    ]

    for user_story in user_stories:
        user_story['story'] = user_story['story'].replace('\n', '<br>')
        user_story['criteria'] = user_story['criteria'].replace('\n', '<br>')

    return user_stories


def add_user_story(story):
    print(story)
