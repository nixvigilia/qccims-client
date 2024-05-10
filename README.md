Title: Steps to Run QCCIMS Client

1. Clone the repository:

   ```bash
   git clone https://github.com/nixvigilia/qccims-client
   ```

2. Create a file named `.env.local` in the root directory of the project.

3. Add the following environment variables to the `.env.local` file:

   ```
   NEXT_PUBLIC_CLIENT_URL="http://localhost:3000"
   NEXT_PUBLIC_SERVER_URL="http://localhost:8080"
   NEXT_PUBLIC_CLIENT_TOKEN="clientaccess"
   NODE_ENV="development"
   ```

4. Install project dependencies:

   ```bash
   npm install
   ```

5. Run the command
   ```bash
   npm run dev
   ```
