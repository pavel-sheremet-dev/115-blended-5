'use client';

export default function EditProfileClient() {
  // оновлення юзеру
  // оновлення стану юзера

  return (
    <main>
      <div>
        <h1>Edit Profile</h1>

        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" name="username" />
          </div>

          <p>Email:</p>

          <div>
            <button type="submit">Save</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}
